var forge = require('node-forge');
var nconf = require('nconf');
var fs = require('fs');
var uuid = require('node-uuid');
var prompt = require('prompt');
nconf.argv();
prompt.start();
require('colors');

/**
 * Generates new key credentials.
 *
 * @param privateKey
 * @param publicKey
 * @param cert
 */
var generateKeyCred = function(privateKey, cert) {

  // Convert the Certificate to DER format.
  var certDER = forge.asn1.toDer(forge.pki.certificateToAsn1(cert));

  // Convert the certificate to hexidecimal.
  var certHEX = certDER.toHex();

  // Create a digest of the cert to get the fingerprint.
  var md = forge.md.sha1.create();
  md.start();
  md.update(certDER.getBytes());
  var digest = md.digest();

  // Get the key credentials.
  console.log('');
  console.log('Key Credentials:');
  console.log(JSON.stringify({
    customKeyIdentifier: (new Buffer(digest.toHex(), 'hex')).toString('base64'),
    value: (new Buffer(certHEX, 'hex')).toString('base64'),
    keyId: uuid.v4(),
    usage: 'Verify',
    type: 'AsymmetricX509Cert'
  }, null, 4).green);

  // Print out the private key.
  console.log('');
  console.log('Private Key:');
  console.log(forge.pki.privateKeyToPem(privateKey).green);

  // Print out the certificate.
  console.log('');
  console.log('Certificate:');
  console.log(forge.pki.certificateToPem(cert).green);

  // Print out the certificate fingerprint
  console.log('');
  console.log('Certificate Fingerprint:');
  console.log(digest.toHex().green);
};

var privateKey = nconf.get('key');
var cert = nconf.get('cert');
if (privateKey && cert) {
  generateKeyCred(
      forge.pki.privateKeyFromPem(fs.readFileSync(privateKey).toString()),
      forge.pki.certificateFromPem(fs.readFileSync(cert).toString(), true)
  );
}
else {

  // Prompt for stuff....
  prompt.get({
    properties: {
      newcert: {
        description: 'Would you like to generate a new Certificate or use an existing one?\n\n  1.) Generate New\n  2.) Use Existing',
        pattern: /^[12]$/,
        message: "You must pick either 1 or 2.",
        required: true
      }
    }
  }, function(err, params) {
    if (parseInt(params.newcert, 10) === 1) {
      prompt.get({
        properties: {
          countryName: {
            description: 'Country Name (2 letter code) [AU]'
          },
          province: {
            description: 'State or Province Name (full name) [Some-State]'
          },
          localityName: {
            description: 'Locality Name (eg, city) []'
          },
          organizationName: {
            description: 'Organization Name (eg, company) [Internet Widgits Pty Ltd]'
          },
          ou: {
            description: 'Organizational Unit Name (eg, section) []'
          },
          commonName: {
            description: 'Common Name (e.g. server FQDN or YOUR name)'
          },
        }
      }, function(err, certparams) {
        // Generate a key pair.
        console.log('Generating key pairs');
        var keys = forge.pki.rsa.generateKeyPair(2048);

        console.log('Creating a certificate.');
        var cert = forge.pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
        var attrs = [{
          name: 'commonName',
          value: certparams.commonName
        }, {
          name: 'countryName',
          value: certparams.countryName
        }, {
          shortName: 'ST',
          value: certparams.province
        }, {
          name: 'localityName',
          value: certparams.localityName
        }, {
          name: 'organizationName',
          value: certparams.organizationName
        }, {
          shortName: 'OU',
          value: certparams.ou
        }];
        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        cert.setExtensions([{
          name: 'basicConstraints',
          cA: true
        }, {
          name: 'keyUsage',
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true
        }, {
          name: 'extKeyUsage',
          serverAuth: true,
          clientAuth: true,
          codeSigning: true,
          emailProtection: true,
          timeStamping: true
        }, {
          name: 'nsCertType',
          client: true,
          server: true,
          email: true,
          objsign: true,
          sslCA: true,
          emailCA: true,
          objCA: true
        }, {
          name: 'subjectKeyIdentifier'
        }]);

        // self-sign certificate
        console.log('Signing the certificate.');
        cert.sign(keys.privateKey);

        // Generate the key credentials.
        generateKeyCred(keys.privateKey, cert);
      });
    }
    else {
      prompt.get({
        properties: {
          privateKey: {
            description: 'Private Key file location?',
            required: true
          },
          cert: {
            description: 'Certificate file location?',
            required: true
          }
        }
      }, function(err, fileparams) {
        generateKeyCred(
            forge.pki.privateKeyFromPem(fs.readFileSync(fileparams.privateKey).toString()),
            forge.pki.certificateFromPem(fs.readFileSync(fileparams.cert).toString(), true)
        );
      });
    }
  });
}

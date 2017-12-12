var nconf = require('nconf');
var fs = require('fs');
var KeyCred = require('./keycred');
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
var printKeyCred = function (keycred) {

  // Convert the keycred to JSON.
  keycred = keycred.toJSON();

  // Get the key credentials.
  console.log('');
  console.log('Key Credentials:');
  console.log(JSON.stringify(keycred.keycred, null, 4).green);

  // Print out the private key.
  console.log('');
  console.log('Private Key:');
  console.log(keycred.privateKey.green);

  // Print out the certificate.
  console.log('');
  console.log('Certificate:');
  console.log(keycred.cert.green);

  // Print out the certificate fingerprint
  console.log('');
  console.log('Certificate Fingerprint:');
  console.log(keycred.fingerprint.green);
};

var privateKey = nconf.get('key');
var cert = nconf.get('cert');
if (privateKey && cert) {
  printKeyCred(new KeyCred.fromPem(
    fs.readFileSync(privateKey).toString(),
    fs.readFileSync(cert).toString()
  ));
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
  }, function (err, params) {
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
          expireInYears: {
            description: 'Number of years until expiration (default is 1, max is 50)'
          }
        }
      }, function (err, certparams) {
        printKeyCred(new KeyCred(certparams));
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
      }, function (err, fileparams) {

        // Print the keycred from the provided PEM files.
        printKeyCred(new KeyCred.fromPem(
          fs.readFileSync(fileparams.privateKey).toString(),
          fs.readFileSync(fileparams.cert).toString()
        ));
      });
    }
  });
}

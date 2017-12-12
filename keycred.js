var forge = require('node-forge');
var uuid = require('node-uuid');

/**
 * Generate a new KeyCred using cert parameters.
 * @param certparams
 * @constructor
 */
var KeyCred = function (certparams) {
    var keys = forge.pki.rsa.generateKeyPair(2048);
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
    this.cert = this.createCertificate(certparams);
    this.keycred = null;
    this.digest = null;
};

/**
 * Generate a KeyCred using PEM formated private key and cert.
 * @param privateKey
 * @param cert
 */
KeyCred.fromPem = function (privateKey, cert) {
    this.privateKey = forge.pki.privateKeyFromPem(privateKey);
    this.cert = forge.pki.certificateFromPem(cert, true);
    this.keycred = null;
    this.digest = null;
};

/**
 * Create a new certificate.
 */
KeyCred.prototype.createCertificate = function (certparams) {
    var cert = forge.pki.createCertificate();
    cert.publicKey = this.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    var expireInYears = 1;
    if (certparams.expireInYears) {
        expireInYears = parseInt(certparams.expireInYears);
    }
    if (expireInYears > 50) expireInYears = 50;
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + expireInYears);
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

    // Sign the certificate.
    cert.sign(this.privateKey);
    return cert;
};

/**
 * Generate the keycred.
 */
KeyCred.prototype.generate = function () {

    // Convert the Certificate to DER format.
    var certDER = forge.asn1.toDer(forge.pki.certificateToAsn1(this.cert));

    // Convert the certificate to hexidecimal.
    var certHEX = certDER.toHex();

    // Create a digest of the cert to get the fingerprint.
    var md = forge.md.sha1.create();
    md.start();
    md.update(certDER.getBytes());
    this.digest = md.digest();
    this.keycred = {
        customKeyIdentifier: (new Buffer(this.digest.toHex(), 'hex')).toString('base64'),
        value: (new Buffer(certHEX, 'hex')).toString('base64'),
        keyId: uuid.v4(),
        usage: 'Verify',
        type: 'AsymmetricX509Cert'
    };
};

/**
 * Get the KeyCred in JSON form.
 */
KeyCred.prototype.toJSON = function () {
    if (!this.keycred) {
        this.generate();
    }

    // Return the JSON representation of this keycred object.
    return {
        keycred: this.keycred,
        privateKey: forge.pki.privateKeyToPem(this.privateKey),
        cert: forge.pki.certificateToPem(this.cert),
        fingerprint: this.digest.toHex()
    };
};

// Return the KeyCred class.
module.exports = KeyCred;
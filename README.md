A key credential generator for Office 365 API App-Only Permissions (Client Credentials Grant Flow) in Azure AD.

## Introduction
This utility can be used to generate the keyCredentials that allows for "app-only" access to the Office 365 API from
within Azure AD applications.

When setting up a new application within Azure, it provides an Application Manifest that can be used to provide key
credentials for your application to access the API. Many of the online tutorials provide a walkthrough on how to
generate the keys for this, but not from a cross-platform way.

This utility provides an easy-to-use cross-platform way to generate a keyCredentials that can be used to populate the
application manifest file.

## Instructions
First thing you must do is install the library using Node.js NPM.

```
npm install -g keycred
```

Next, simply run the application by typing the following...

```
keycred
```

Follow the instructions it provides.

## Example

```
prompt: Would you like to generate a new Certificate or use an existing one?

  1.) Generate New
  2.) Use Existing:  1
prompt: Country Name (2 letter code) [AU]:  US
prompt: State or Province Name (full name) [Some-State]:  Texas
prompt: Locality Name (eg, city) []:  Dallas
prompt: Organization Name (eg, company) [Internet Widgits Pty Ltd]:  Form.io
prompt: Organizational Unit Name (eg, section) []:  IT
prompt: Common Name (e.g. server FQDN or YOUR name):  Travis Tidwell
prompt: Number of years until expiration (default is 1, max is 50):  3
Generating key pairs
Creating a certificate.
Signing the certificate.

Key Credentials:
{
    "customKeyIdentifier": "abrvf2N5nwK5Lkqfkku5xstfkWI=",
    "value": "MIID1TCCAr2gAwIBAgIBATANBgkqhkiG9w0BAQUFADBmMRcwFQYDVQQDEw5UcmF2aXMgVGlkd2VsbDELMAkGA1UEBhMCVVMxDjAMBgNVBAgTBVRleGFzMQ8wDQYDVQQHEwZEYWxsYXMxEDAOBgNVBAoTB0Zvcm0uaW8xCzAJBgNVBAsTAklUMB4XDTE1MDgwNzE2MzQwNFoXDTE2MDgwNzE2MzQwNFowZjEXMBUGA1UEAxMOVHJhdmlzIFRpZHdlbGwxCzAJBgNVBAYTAlVTMQ4wDAYDVQQIEwVUZXhhczEPMA0GA1UEBxMGRGFsbGFzMRAwDgYDVQQKEwdGb3JtLmlvMQswCQYDVQQLEwJJVDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL3l+IzZ/3gTzNZHUTTDwJYeq0/yRaGofUJFG3mD5GBqlr5+17+SqLuWwHXfoV8tPckhuFYTL4HhKGm+GO0EHpL+i8bbweMhfRUDvhKBiUxZtZpalqeWKTkhB7tFs5lWepgzZ/JTsKwkCtCZp2D6UJ7+HbfqQ/jOBlFXITbtsOLiGFQI0WTgtHPg9Bj2kZin4UjNpOdvE0qK7XFCiPkyAUGvGHqetq2dw1Z9rxQ5w03ZZIL1DTVNtN3mxC8PX5Bcc0IOcsSNLqcXDt43+amTMYBMWbYYFOYjqZVEdIXf+ZzOJzjwXoFL53RYxKHdZXWC8y4f6dd0jzwNIvepnx7SDa8CAwEAAaOBjTCBijAMBgNVHRMEBTADAQH/MAsGA1UdDwQEAwIC9DA7BgNVHSUENDAyBggrBgEFBQcDAQYIKwYBBQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYBBQUHAwgwEQYJYIZIAYb4QgEBBAQDAgD3MB0GA1UdDgQWBBSFghpkrNaarwWD5lyvy1ll95iU+DANBgkqhkiG9w0BAQUFAAOCAQEArl/lxpD9lRuRPiaWgIipECkxZv3bOyaS/x1I23H21w1t7w5aNac6PxvJhvA0qehNqT/nYGmopCYBDEv7nLGWIwZNUKAcIXGmNZWoOkH9d8RP45h3Mb0anWd8t/WuJr/Q3Jby5UvKeVKec2ews2wr8qm+AeONF1KwWUe7pyQN5G4bwbOTrFeO4Epf/Q9jxnN8xH7Jx5hSkVOQGOKa8vB80QKewKAeF3XcEqFTiLpvulmwiBiUAEVpjJ2FEw3+3QygSBkbzFdz6F8w644AL7ep0TpSXHDh07hEugsMx6xOCAD6e40pLCkT2y4UDAoeHovhD3jD7dUEuv5UyWiTu3esLw==",
    "keyId": "f1f70508-8ec6-42b0-9bdc-5e0514e7cc4b",
    "usage": "Verify",
    "type": "AsymmetricX509Cert"
}

Private Key:
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAveX4jNn/eBPM1kdRNMPAlh6rT/JFoah9QkUbeYPkYGqWvn7X
v5Kou5bAdd+hXy09ySG4VhMvgeEoab4Y7QQekv6LxtvB4yF9FQO+EoGJTFm1mlqW
p5YpOSEHu0WzmVZ6mDNn8lOwrCQK0JmnYPpQnv4dt+pD+M4GUVchNu2w4uIYVAjR
ZOC0c+D0GPaRmKfhSM2k528TSortcUKI+TIBQa8Yep62rZ3DVn2vFDnDTdlkgvUN
NU203ebELw9fkFxzQg5yxI0upxcO3jf5qZMxgExZthgU5iOplUR0hd/5nM4nOPBe
gUvndFjEod1ldYLzLh/p13SPPA0i96mfHtINrwIDAQABAoIBAAKQeXPFedqwQcLf
Aay5u/8K+PtCZUhSkyZy8nUIn+vhZJm78sPmghrOZVjyJSa44K23o9qdtbWGSdpr
s8B3nsYTY+XSj+K2UA8ZltZ/I1CBoZ8s+/3VXEcmOAmCXnOCpHMrtoqiMK+SaQb6
HDWGC9Kp0dLq+fIBLjqo94zbVtkpeH4rpUSoh1/fFCcAYgGD0CV57yZULqboGacS
sCBNCJnd9iJzD65GrY4kqKcABK+p0SOepkdQJMDx6dFJY/GAsske0kI+qb2pFt3t
wG5cDr4XVFTtjmb/sXaQ0iKGwfmLcVatlYlbuQg4R3OoPrNQgSmjtV/fpOlnP0yq
4JUSQzkCgYEA6BpLtMGk+k8/4BfP+f+tU2W8iRkPYKKChYwlH3FJNIjVu0SKX7Tf
vwgkAL/ar0aUFaXvWPYvz8aglq4Tz1V6uir5rkNH6/MgIhz7i0vlAlsXRR5obdYg
OmNb4X+tLzAzROE7p4pg9QoiGAgeOq8nAOIYuq0pp8Srym0+cbBXqrsCgYEA0XND
NET90JcMGXoyvTtPHiWTGNZgkjuhQ/nX7k6WrTiKrvRcCjf81hNHOiS85Bo3ev6j
YhsgMJBIj4HKUlusIB8BRvHRROxrorKYBjK6TcO0PCW/d3ZiwiOm/2X58x+KI/iP
Vl3SPxY8jfTz/80+A5x7LPjSob1WJoW9QbHr+50CgYEAu2XPzkezHm6yEgrn3t+y
X+16he733XwYih8XMgXTp1j7yFGUr6VoKeM2vmwo8u+3TKtHTrqm68lhi4dNc09+
4aUlJrAn97e7MA/agSNr6bUGWsYsZtJF/x6N5smhWMJAAtMfySwPEIl38ZNMZPFa
OnpSoRaC1XQTiEMf8ccBYVUCgYAYo/S+C3fIuFxmCug5NucB5u29OEs4KOe59YSf
toMnccVu+7RwR1HpZW81uei29Rad06MpAYPx8qd2qpBAzCQdy0f9Lqmt8Bphk50q
7YDZcTKc+Nvjk/veVw9ocHjNT2KTBMToJjV70oPhN3YVG/I1vo0HJ2awPHQMKCOx
vNrESQKBgCMUef+XW3PCWihNBbSZP1xmvhJHM9MAmPufb+MgNi7+0I69YL00/a6e
NVPYP957RrGjf6hiTEKmc2ipZh/hIVW9nPIpWhJ+SsxWHj/2RQbIWIGRRQ7F5pls
0ibMc7T5K7AGVT0q0ppBLheFQkeSnPbHJrX40xILEkzd/0RLvC8X
-----END RSA PRIVATE KEY-----


Certificate:
-----BEGIN CERTIFICATE-----
MIID1TCCAr2gAwIBAgIBATANBgkqhkiG9w0BAQUFADBmMRcwFQYDVQQDEw5UcmF2
aXMgVGlkd2VsbDELMAkGA1UEBhMCVVMxDjAMBgNVBAgTBVRleGFzMQ8wDQYDVQQH
EwZEYWxsYXMxEDAOBgNVBAoTB0Zvcm0uaW8xCzAJBgNVBAsTAklUMB4XDTE1MDgw
NzE2MzQwNFoXDTE2MDgwNzE2MzQwNFowZjEXMBUGA1UEAxMOVHJhdmlzIFRpZHdl
bGwxCzAJBgNVBAYTAlVTMQ4wDAYDVQQIEwVUZXhhczEPMA0GA1UEBxMGRGFsbGFz
MRAwDgYDVQQKEwdGb3JtLmlvMQswCQYDVQQLEwJJVDCCASIwDQYJKoZIhvcNAQEB
BQADggEPADCCAQoCggEBAL3l+IzZ/3gTzNZHUTTDwJYeq0/yRaGofUJFG3mD5GBq
lr5+17+SqLuWwHXfoV8tPckhuFYTL4HhKGm+GO0EHpL+i8bbweMhfRUDvhKBiUxZ
tZpalqeWKTkhB7tFs5lWepgzZ/JTsKwkCtCZp2D6UJ7+HbfqQ/jOBlFXITbtsOLi
GFQI0WTgtHPg9Bj2kZin4UjNpOdvE0qK7XFCiPkyAUGvGHqetq2dw1Z9rxQ5w03Z
ZIL1DTVNtN3mxC8PX5Bcc0IOcsSNLqcXDt43+amTMYBMWbYYFOYjqZVEdIXf+ZzO
JzjwXoFL53RYxKHdZXWC8y4f6dd0jzwNIvepnx7SDa8CAwEAAaOBjTCBijAMBgNV
HRMEBTADAQH/MAsGA1UdDwQEAwIC9DA7BgNVHSUENDAyBggrBgEFBQcDAQYIKwYB
BQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYBBQUHAwgwEQYJYIZIAYb4QgEB
BAQDAgD3MB0GA1UdDgQWBBSFghpkrNaarwWD5lyvy1ll95iU+DANBgkqhkiG9w0B
AQUFAAOCAQEArl/lxpD9lRuRPiaWgIipECkxZv3bOyaS/x1I23H21w1t7w5aNac6
PxvJhvA0qehNqT/nYGmopCYBDEv7nLGWIwZNUKAcIXGmNZWoOkH9d8RP45h3Mb0a
nWd8t/WuJr/Q3Jby5UvKeVKec2ews2wr8qm+AeONF1KwWUe7pyQN5G4bwbOTrFeO
4Epf/Q9jxnN8xH7Jx5hSkVOQGOKa8vB80QKewKAeF3XcEqFTiLpvulmwiBiUAEVp
jJ2FEw3+3QygSBkbzFdz6F8w644AL7ep0TpSXHDh07hEugsMx6xOCAD6e40pLCkT
2y4UDAoeHovhD3jD7dUEuv5UyWiTu3esLw==
-----END CERTIFICATE-----
```

Once you have the keyCredential generated, you can then add that your your manifest file as follows...

**55e1a764-58c7-4423-a75e-75b902e22cce.json***
```
...
...
  "keyCredentials": [
    {
        "customKeyIdentifier": "abrvf2N5nwK5Lkqfkku5xstfkWI=",
        "value": "MIID1TCCAr2gAwIBAgIBATANBgkqhkiG9w0BAQUFADBmMRcwFQYDVQQDEw5UcmF2aXMgVGlkd2VsbDELMAkGA1UEBhMCVVMxDjAMBgNVBAgTBVRleGFzMQ8wDQYDVQQHEwZEYWxsYXMxEDAOBgNVBAoTB0Zvcm0uaW8xCzAJBgNVBAsTAklUMB4XDTE1MDgwNzE2MzQwNFoXDTE2MDgwNzE2MzQwNFowZjEXMBUGA1UEAxMOVHJhdmlzIFRpZHdlbGwxCzAJBgNVBAYTAlVTMQ4wDAYDVQQIEwVUZXhhczEPMA0GA1UEBxMGRGFsbGFzMRAwDgYDVQQKEwdGb3JtLmlvMQswCQYDVQQLEwJJVDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL3l+IzZ/3gTzNZHUTTDwJYeq0/yRaGofUJFG3mD5GBqlr5+17+SqLuWwHXfoV8tPckhuFYTL4HhKGm+GO0EHpL+i8bbweMhfRUDvhKBiUxZtZpalqeWKTkhB7tFs5lWepgzZ/JTsKwkCtCZp2D6UJ7+HbfqQ/jOBlFXITbtsOLiGFQI0WTgtHPg9Bj2kZin4UjNpOdvE0qK7XFCiPkyAUGvGHqetq2dw1Z9rxQ5w03ZZIL1DTVNtN3mxC8PX5Bcc0IOcsSNLqcXDt43+amTMYBMWbYYFOYjqZVEdIXf+ZzOJzjwXoFL53RYxKHdZXWC8y4f6dd0jzwNIvepnx7SDa8CAwEAAaOBjTCBijAMBgNVHRMEBTADAQH/MAsGA1UdDwQEAwIC9DA7BgNVHSUENDAyBggrBgEFBQcDAQYIKwYBBQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYBBQUHAwgwEQYJYIZIAYb4QgEBBAQDAgD3MB0GA1UdDgQWBBSFghpkrNaarwWD5lyvy1ll95iU+DANBgkqhkiG9w0BAQUFAAOCAQEArl/lxpD9lRuRPiaWgIipECkxZv3bOyaS/x1I23H21w1t7w5aNac6PxvJhvA0qehNqT/nYGmopCYBDEv7nLGWIwZNUKAcIXGmNZWoOkH9d8RP45h3Mb0anWd8t/WuJr/Q3Jby5UvKeVKec2ews2wr8qm+AeONF1KwWUe7pyQN5G4bwbOTrFeO4Epf/Q9jxnN8xH7Jx5hSkVOQGOKa8vB80QKewKAeF3XcEqFTiLpvulmwiBiUAEVpjJ2FEw3+3QygSBkbzFdz6F8w644AL7ep0TpSXHDh07hEugsMx6xOCAD6e40pLCkT2y4UDAoeHovhD3jD7dUEuv5UyWiTu3esLw==",
        "keyId": "f1f70508-8ec6-42b0-9bdc-5e0514e7cc4b",
        "usage": "Verify",
        "type": "AsymmetricX509Cert"
    }
  ],
...
...
```

The private and public keys can then be used within your application to access the API's.

Enjoy...

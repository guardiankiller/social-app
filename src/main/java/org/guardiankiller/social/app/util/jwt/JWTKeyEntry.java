package org.guardiankiller.social.app.util.jwt;

import lombok.RequiredArgsConstructor;

import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;

@RequiredArgsConstructor
public class JWTKeyEntry {

    private final KeyStore.PrivateKeyEntry entry;

    public PublicKey getPublicKey() {
        return entry.getCertificate().getPublicKey();
    }

    public PrivateKey getPrivateKey() {
        return entry.getPrivateKey();
    }
}

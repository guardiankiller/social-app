package org.guardiankiller.social.app.util.jwt;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableEntryException;
import java.security.cert.CertificateException;

@Slf4j
public class JWTKeystore {

    private final KeyStore keyStore;

    public static JWTKeystore fromClasspath(String resource, String password) {
        try(var in = ClassLoader.getSystemResourceAsStream(resource)) {
            return new JWTKeystore(in, password);
        } catch (IOException e) {
            String msg = "Failed to load keystore";
            log.error(msg, e);
            throw new JWTException(msg, e);
        }
    }

    private JWTKeystore(InputStream in, String password) {
        try {
            keyStore = KeyStore.getInstance("JKS");
            keyStore.load(in, password.toCharArray());
        } catch (KeyStoreException | CertificateException | IOException | NoSuchAlgorithmException e) {
            String msg = "Failed to load keystore";
            log.error(msg, e);
            throw new JWTException(msg, e);
        }
    }

    public JWTKeyEntry getEntry(String alias, String password) {

        try {
            return new JWTKeyEntry(
                (KeyStore.PrivateKeyEntry) keyStore
                                               .getEntry(alias,
                                                   new KeyStore.PasswordProtection(password.toCharArray())));
        } catch (NoSuchAlgorithmException | UnrecoverableEntryException | KeyStoreException e) {
            String msg = "Failed to load key" + alias;
            log.error(msg, e);
            throw new RuntimeException(msg, e);
        }
    }
}

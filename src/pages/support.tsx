import React, { useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Intercom, { show, shutdown } from "@intercom/messenger-js-sdk";
import { DiscordIcon, GitHubIcon } from "@site/src/components/icons";

import styles from "./support.module.css";

const INTERCOM_APP_ID = "aprh5f83";

type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = require("@theme/Layout").default;

export default function Support(): React.ReactNode {
  useEffect(() => {
    Intercom({
      app_id: INTERCOM_APP_ID,
      hide_default_launcher: true,
    });

    return () => {
      shutdown();
    };
  }, []);

  return (
    <Layout
      title="Linea and Lineth support resources"
      description="Find support and community resources for Linea Mainnet users, developers building on Linea, and Lineth stack operators and evaluators.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Linea Support</h1>
            <p className={styles.intro}>
              Can&apos;t find what you need in the docs? Contact support or
              choose the resources for your situation below.
            </p>
            <button
              id="intercom-button"
              type="button"
              className={clsx("button", styles.primaryButton)}
              onClick={() => show()}>
              Contact support
            </button>
          </div>
        </section>

        <section className={styles.resources} aria-label="Support resources">
          <div className={styles.resourcesInner}>
            <div className={styles.audienceSection}>
              <h2 id="support-resources">Linea Mainnet users</h2>
              <div className={styles.resourceGrid}>
                <Link
                  className={styles.resourceCard}
                  to="https://linea.statuspage.io/">
                  <span>Status</span>
                  <p>Check Linea network and service status.</p>
                </Link>
                <Link
                  className={styles.resourceCard}
                  to="https://support.metamask.io/manage-crypto/transactions/how-to-speed-up-or-cancel-a-pending-transaction/#canceling-a-transaction">
                  <span>Stuck transaction</span>
                  <p>Use MetaMask guidance to cancel a stuck transaction.</p>
                </Link>
              </div>
            </div>

            <div className={styles.audienceSection}>
              <h2>Linea builders</h2>
              <div className={styles.resourceGrid}>
                <Link
                  className={styles.resourceCard}
                  to="https://community.linea.build/">
                  <span>Linea community</span>
                  <p>Join discussions with the Linea community.</p>
                </Link>
                <Link
                  className={styles.resourceCard}
                  to="https://linea.build/hub">
                  <span>Linea Hub</span>
                  <p>Explore apps and tokens, or list your app on Linea.</p>
                </Link>
              </div>
            </div>

            <div className={styles.audienceSection}>
              <h2>Lineth stack operators and evaluators</h2>
              <div className={styles.resourceGrid}>
                <Link
                  className={styles.resourceCard}
                  to="https://github.com/LFDT-Lineth/lineth-monorepo">
                  <div className={styles.resourceTitle}>
                    <GitHubIcon
                      className={styles.resourceIcon}
                      aria-hidden="true"
                    />
                    <span>Lineth on GitHub</span>
                  </div>
                  <p>
                    Explore the source code for the Lineth open-source stack.
                  </p>
                </Link>
                <Link
                  className={styles.resourceCard}
                  to="https://discord.gg/hyperledger">
                  <div className={styles.resourceTitle}>
                    <DiscordIcon
                      className={styles.resourceIcon}
                      aria-hidden="true"
                    />
                    <span>LF Decentralized Trust Discord</span>
                  </div>
                  <p>
                    Join the open-source community for LF Decentralized Trust
                    projects on Discord.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

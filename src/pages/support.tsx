import React from "react";
import Link from "@docusaurus/Link";
import { DiscordIcon, GitHubIcon } from "@site/src/components/icons";

import styles from "./support.module.css";

type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = require("@theme/Layout").default;

export default function Support(): React.ReactNode {
  return (
    <Layout
      title="Linea and Lineth help resources"
      description="Find help and community resources for Linea Mainnet users, developers building on Linea, and Lineth stack operators and evaluators.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Linea Help</h1>
            <p className={styles.intro}>
              Can&apos;t find what you need in the docs? Choose the resources
              for your situation below.
            </p>
          </div>
        </section>

        <section className={styles.resources} aria-label="Help resources">
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

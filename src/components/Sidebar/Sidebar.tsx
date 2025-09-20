"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";

const navItems = [
  { href: "/grammar-fixer", icon: "/icons/check.svg", label: "მართლმწერი" },
  { href: "/", icon: "/icons/a.svg", label: "ტექსტის შედარება" },
  { href: "/voice-to-text", icon: "/icons/mic.svg", label: "ხმა ➔ ტექსტი" },
  { href: "/text-to-voice", icon: "/icons/audio.svg", label: "ტექსტი ➔ ხმა" },
  { href: "/pdf-converter", icon: "/icons/pdf.svg", label: "PDF კონვერტაცია" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const activeIndex = navItems.findIndex(item => item.href === pathname);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menu}>

        <div className={styles.uppersidebar}>
          <Link href="/" aria-label="home" className={styles.arrowback} >
            <Image src="/icons/arrowback.svg" width={20} height={20} alt="icon" />
          </Link>
          <Link href="/" aria-label="Home" className={styles.logo}>
            <Image src="/icons/logo.svg" fill alt="owl" />
          </Link>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item, index) => {
            const classes = [styles.item];

            if (index === activeIndex) classes.push(styles.active);
            else if (index === activeIndex - 1) classes.push(styles.beforeActive);
            else if (index === activeIndex + 1) classes.push(styles.afterActive);

            return (
              <div key={index} className={styles.white}>
                <Link href={item.href} className={classes.join(" ")}>
                  <Image src={item.icon} width={20} height={20} alt="" />
                  <span>{item.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>





      <div className={styles.username}>
        <div className={styles.user}>
          <Image src="/icons/user.svg" width={24} height={24} alt="icon" />
          <p>თამარ ონიანი</p>
        </div>
        <Image src="/icons/threedots.svg" width={24} height={24} alt="icon" />
      </div>


    </aside>
  );
}

"use client";
import Image from "next/image";
import styles from "./Header.module.scss";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const [language, setLanguage] = useState('ქართული')

  return (


    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/icons/logo.svg" width={90} height={36} alt="logo" />
        <Image src="/icons/menu.svg" width={24} height={24} alt="logo" />
      </div>
      <div className={styles.compare}>
        <Image src="/icons/subheader.svg" width={200} height={24} alt="logo" />        
      </div>
      <div className={styles.menu}>
        <div className={styles.field}>
          <div
            id="lang"
            className={!open ? styles.lang : styles.active}
            onClick={() => setOpen(!open)}
          >
            <label htmlFor="lang"></label>
            <div className={styles.selected}>{language} </div>

            {open && (
              <ul className={styles.options}>
                <li onClick={() => setLanguage('ქართული')}><input type="radio" value="ქართული" />ქართული</li>
                <li onClick={() => setLanguage('English')}><input type="radio" value="English" />English</li>
              </ul>
            )}

          </div>
          <div className={styles.format}>
            <input id="keepFormat" type="checkbox" />
            <label htmlFor="keepFormat">ფორმატის შენარჩუნება</label>

          </div>
        </div>
        <div className={styles.new}> {/* onClick={} */}
          <Image src="/icons/plus.svg" width={24} height={24} alt="icon" />
          <p>ახლის გახსნა</p>
        </div>
      </div>

    </header>
  );
}





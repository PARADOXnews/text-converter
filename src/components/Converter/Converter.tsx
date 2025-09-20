"use client";
import Image from "next/image";
import styles from "./Header.module.scss";
import { useState } from "react";

export default function Converter() {
   const [inputText, setInputText] = useState("");

   return (
      <section className={styles.textSection}>
         <div className={styles.textAreas}>

            <div
               className={styles.inputText}
               contentEditable
               data-placeholder="დაიწყე წერა..."
               suppressContentEditableWarning
               onInput={(e) =>
                  setInputText((e.target as HTMLDivElement).innerText)
               }
            />
            <Image src="/icons/arrow.svg" width={32} height={32} alt="icon" />
            <div
               className={styles.outputText}
               contentEditable
               data-placeholder="დაიწყე წერა..."
               suppressContentEditableWarning
               onInput={(e) =>
                  setInputText((e.target as HTMLDivElement).innerText)
               }
            />
         </div>
         <div className={styles.submit}></div>
      </section>
      
)
}
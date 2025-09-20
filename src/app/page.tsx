"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Converter from "@/components/Converter/Converter";
import TextCompare from "@/components/Text/TextCompare";

export default function Home() {

  return (
    <>
    <div className={styles.header}>
      <Header />
      
    </div>
      <main className={styles.main}>
        <TextCompare />
      </main >
    </>
  );
}

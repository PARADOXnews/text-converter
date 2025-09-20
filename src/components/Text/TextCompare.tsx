"use client";
import { useRef, useState, useLayoutEffect } from "react";
import { diffWordsWithSpace, diffChars, Change } from "diff";
import styles from "./TextCompare.module.scss";
import Image from "next/image";

// HTML escape
const esc = (s: string) =>
  s.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Character-level highlight for replacements
function highlightPairChars(L: string, R: string) {
  const parts = diffChars(L, R);
  let lOut = "", rOut = "";
  for (const p of parts) {
    const val = esc(p.value);
    if (p.added) rOut += `<span data-add>${val}</span>`;
    else if (p.removed) lOut += `<span data-del>${val}</span>`;
    else { lOut += val; rOut += val; }
  }
  return { lOut, rOut };
}

// Word-level diff
function buildDiffHTML(left: string, right: string) {
  const chunks: Change[] = diffWordsWithSpace(left, right);
  let lHTML = "", rHTML = "";

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    if (c.removed && i + 1 < chunks.length && chunks[i + 1].added) {
      const pair = highlightPairChars(c.value, chunks[i + 1].value);
      lHTML += pair.lOut;
      rHTML += pair.rOut;
      i++;
    } else if (c.added) {
      rHTML += `<span data-add>${esc(c.value)}</span>`;
    } else if (c.removed) {
      lHTML += `<span data-del>${esc(c.value)}</span>`;
    } else {
      const val = esc(c.value);
      lHTML += val;
      rHTML += val;
    }
  }

  return { leftHTML: lHTML || " ", rightHTML: rHTML || " " };
}

export default function TextCompare() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [compared, setCompared] = useState(false);
  const [leftHTML, setLeftHTML] = useState(" ");
  const [rightHTML, setRightHTML] = useState(" ");

  const leftTARef = useRef<HTMLTextAreaElement | null>(null);
  const rightTARef = useRef<HTMLTextAreaElement | null>(null);
  const leftHLRef = useRef<HTMLDivElement | null>(null);
  const rightHLRef = useRef<HTMLDivElement | null>(null);

  const lastFocused = useRef<"left" | "right" | null>(null);
  const onFocus = (side: "left" | "right") => () => { lastFocused.current = side; };
  const preventBlur = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const onChangeLeft = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLeft(e.target.value);
    if (compared) setCompared(false);
  };
  const onChangeRight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRight(e.target.value);
    if (compared) setCompared(false);
  };

  const handleCompare = () => {
    const { leftHTML, rightHTML } = buildDiffHTML(left, right);
    setLeftHTML(leftHTML);
    setRightHTML(rightHTML);
    setCompared(true);
  };

  useLayoutEffect(() => {
    if (!compared) return;
    const side = lastFocused.current;
    if (side === "left") leftTARef.current?.focus();
    else if (side === "right") rightTARef.current?.focus();
  }, [compared]);

  const sync = (src: "left" | "right") => {
    const ta = src === "left" ? leftTARef.current : rightTARef.current;
    const hl = src === "left" ? leftHLRef.current : rightHLRef.current;
    if (!ta || !hl) return;
    hl.scrollTop = ta.scrollTop;
    hl.scrollLeft = ta.scrollLeft;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.columns}>
        {/* LEFT */}
        <div className={styles.stack}>
          <div className={styles.areaWrap}>
            <div
              className={`${styles.highlight} ${compared ? styles.on : ""}`}
              ref={leftHLRef}
              aria-hidden
              dangerouslySetInnerHTML={{ __html: compared ? leftHTML : "" }}
            />
            <textarea
              ref={leftTARef}
              className={`${styles.inputText} ${compared ? styles.transparentText : ""}`}
              placeholder="დაწერე რამე..."
              value={left}
              onChange={onChangeLeft}
              onScroll={() => sync("left")}
              onFocus={onFocus("left")}
            />
          </div>
        </div>

        <Image src="/icons/arrow.svg" width={32} height={32} alt="icon" />

        {/* RIGHT */}
        <div className={styles.stack}>
          <div className={styles.areaWrap}>
            <div
              className={`${styles.highlight} ${compared ? styles.on : ""}`}
              ref={rightHLRef}
              aria-hidden
              dangerouslySetInnerHTML={{ __html: compared ? rightHTML : "" }}
            />
            <textarea
              ref={rightTARef}
              className={`${styles.inputText} ${compared ? styles.transparentText : ""}`}
              placeholder="დაწერე რამე..."
              value={right}
              onChange={onChangeRight}
              onScroll={() => sync("right")}
              onFocus={onFocus("right")}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onMouseDown={preventBlur}
          className={`${styles.compareBtn} ${left || right ? styles.hasText : styles.empty}`}
          onClick={handleCompare}
        >
          შედარება
        </button>

      </div>
    </div>
  );
}

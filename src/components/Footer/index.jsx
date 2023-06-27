import React from "react";
import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="light-bg flex justify-space">
            <span className="white">Create By © {year} <Link href="/">Khang</Link> </span>
            <ul className="flex">
                <li>
                    <a href="https://www.facebook.com/trinh.khang.351" target="_blank" rel="noreferrer">
                        <img src="/icons/facebook.svg" width="24" height="24" alt="facebook-icon" />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/trinhkhang123" target="_blank" rel="noreferrer">
                        <img src="/icons/github.svg" width="24" height="24" alt="github-icon" />
                    </a>
                </li>
            </ul>
        </footer>
    )
}
import type { Metadata } from "next";
import CmsClient from "./cms-client";

export const metadata: Metadata = { title: "MATIG CMS Lite" };

export default function Admin() { return <CmsClient />; }
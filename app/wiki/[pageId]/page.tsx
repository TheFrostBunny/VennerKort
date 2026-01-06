"use client";
import { WikiPageViewer } from "../../../components/wiki-page-viewer";
import { useParams } from "next/navigation";

export default function WikiPage() {
  const params = useParams();
  const pageId = typeof params.pageId === "string" ? params.pageId : Array.isArray(params.pageId) ? params.pageId[0] : "";
  return <WikiPageViewer pageId={pageId} />;
}

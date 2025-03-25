export interface SearchResult {
    id: string
    title: string
    excerpt: string
    url: string
    category: "page" | "project" | "documentation" | "news"
  }
  
  export const siteContent: SearchResult[] = [
    {
      id: "1",
      title: "About OpenPrinting",
      excerpt: "Learn more about OpenPrinting, how it works, the people involved, and the projects maintained by it.",
      url: "#about",
      category: "page",
    },
    {
      id: "2",
      title: "CUPS - Common Unix Printing System",
      excerpt:
        "CUPS is the standards-based, open source printing system that is used on Linux® and other operating systems.",
      url: "#cups",
      category: "project",
    },
    {
      id: "3",
      title: "Printer Driver Development",
      excerpt: "Documentation for developing printer drivers compatible with OpenPrinting technologies.",
      url: "#documentation",
      category: "documentation",
    },
    {
      id: "4",
      title: "IPP Everywhere™ Certification",
      excerpt: "Information about the IPP Everywhere™ certification program for printers.",
      url: "#certification",
      category: "documentation",
    },
    {
      id: "5",
      title: "Google Summer of Code 2025",
      excerpt: "The Linux Foundation is accepted as an umbrella organization for GSoC 2025.",
      url: "#news",
      category: "news",
    },
    {
      id: "6",
      title: "Common Print Dialog Backends",
      excerpt: "The Common Print Dialog Backends project provides a vendor-neutral print dialog for all applications.",
      url: "#projects",
      category: "project",
    },
    {
      id: "7",
      title: "Printer Applications",
      excerpt: "Modern printer driver architecture for CUPS and other printing systems.",
      url: "#printer-applications",
      category: "project",
    },
    {
      id: "8",
      title: "Downloads",
      excerpt: "Download OpenPrinting software, drivers, and utilities.",
      url: "#downloads",
      category: "page",
    },
    {
      id: "9",
      title: "Framework RISC-V Board",
      excerpt: "OpenPrinting News - We got a Framework RISC-V board from DeepComputing.",
      url: "#news",
      category: "news",
    },
    {
      id: "10",
      title: "Contribute to OpenPrinting",
      excerpt: "Learn how you can contribute to the OpenPrinting project.",
      url: "#contribute",
      category: "page",
    },
    {
      id: "11",
      title: "Printer Working Group",
      excerpt: "OpenPrinting collaborates with the PWG's Internet Printing Protocol workgroup.",
      url: "#projects",
      category: "project",
    },
    {
      id: "12",
      title: "IPP-based Printing Technology",
      excerpt: "OpenPrinting develops IPP-based printing technology for Linux®/Unix® operating systems.",
      url: "#",
      category: "documentation",
    },
  ]
  
  
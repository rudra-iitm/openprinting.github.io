"use client"

const basePath = process.env.NODE_ENV === "production" ? "/openprinting.github.io" : "";

export default function PrintersPage() {
  return (
    <>
      <div className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-40"
          style={{ backgroundImage: `url('${basePath}/ipp-everywhere.png')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-zinc-900/90" aria-hidden />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find a Driverless Printer
          </h1>
          <p className="text-xl text-white/80">
            Browse printers that work out of the box with AirPrint™ and IPP Everywhere™.
          </p>
        </div>
      </div>

      <main className="min-h-screen bg-background text-foreground pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground mb-8 max-w-3xl">
            This page shows printers that will work without any additional software because
            they support the{" "}
            <a href="https://support.apple.com/en-us/HT201311" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">AirPrint™</a>
            {" "}and/or{" "}
            <a href="https://www.pwg.org/ipp/everywhere.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">IPP Everywhere™</a>
            {" "}standards for driverless printers. These printers also often support{" "}
            <a href="https://mopria.org/certified-products" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mopria®</a>
            {" "}as used on Android OS and Microsoft Windows®, and{" "}
            <a href="https://www.wi-fi.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Wi-Fi Direct Print Services</a>
            {" "}for printing directly via Wi-Fi.
          </p>
          <iframe
            src="https://openprinting.org/printers"
            className="w-full rounded-lg border border-border"
            style={{ height: "80vh", minHeight: "600px" }}
            title="OpenPrinting Printer Database"
            loading="lazy"
          />
        </div>
      </main>
    </>
  )
}

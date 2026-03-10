/**
 * Static mentor data for GSoC years that don't yet have contributors
 * (e.g. ongoing/upcoming years). Extracted from project idea markdown files.
 *
 * For completed years, mentor info comes from gsoc-contributors.ts instead.
 */

export interface GsocProjectMentors {
    slug: string;
    mentors: string[];
}

export interface GsocYearMentors {
    year: number;
    projects: GsocProjectMentors[];
}

const gsocMentors: GsocYearMentors[] = [
    {
        year: 2026,
        projects: [
            {
                slug: "01-system-config-printer-vs-CUPS-3-x",
                mentors: ["Till Kamppeter", "Soumyadeep Ghosh", "Zdenek Dohnal"],
            },
            {
                slug: "02-COSMIC-Desktop",
                mentors: ["Till Kamppeter", "Michael Murphy", "Mintu Gogoi", "Titiksha Bansal"],
            },
            {
                slug: "03-KDE-Print-Manager",
                mentors: ["Till Kamppeter", "Mike Noe"],
            },
            {
                slug: "04-AI-Driven-Printer-Compatibility-and-Recommendation-Portal",
                mentors: ["Rudra Pratap Singh", "Till Kamppeter"],
            },
            {
                slug: "05-AI-Driven-Printer-Compatibility-and-Recommendation-Portal",
                mentors: ["Rudra Pratap Singh", "Till Kamppeter"],
            },
            {
                slug: "06-Automated-and-LLM-Assisted-Fuzz-Harness-Generation-for-OpenPrinting-Projects",
                mentors: ["Till Kamppeter", "Jiongchi Yu", "Zixuan Liu"],
            },
            {
                slug: "07-System-Level-Fuzzing-for-Parsing-Features-in-OpenPrinting-Projects",
                mentors: ["Till Kamppeter", "Jiongchi Yu", "Günther Noack"],
            },
            {
                slug: "08-Fuzz-Test-go-cpython",
                mentors: ["Till Kamppeter", "Jiongchi Yu"],
            },
            {
                slug: "09-Extend-PDFio-to-be-a-PDF-renderer-displayer",
                mentors: ["Till Kamppeter", "Michael Sweet", "Ira McDonald"],
            },
            {
                slug: "10-Porting-OpenPrinting-Software-to-Zephyr",
                mentors: ["Iuliana Prodan", "Hubert Guan", "Akarshan Kapoor", "Till Kamppeter"],
            },
            {
                slug: "11-Build-a-Full-Print-System-Testing-Pipeline",
                mentors: ["Till Kamppeter"],
            },
            {
                slug: "12-Validation-of-the-IANA-IPP-Registrations-Database",
                mentors: ["Till Kamppeter"],
            },
            {
                slug: "13-Cloud-Native-Packaging-for-CUPS-and-Printer-Applications",
                mentors: ["Kyle Yu", "Mohammad Ali", "Sonali Srivastava", "Till Kamppeter"],
            },
            {
                slug: "14-CI-Testing-programs-for-libpappl-retrofit-and-libppd",
                mentors: ["Till Kamppeter", "Michael Sweet"],
            },
            {
                slug: "15-cups-filters",
                mentors: ["Till Kamppeter", "Sahil Arora", "Dheeraj Yadav"],
            },
        ],
    },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get mentors for a specific project slug in a given year */
export function getMentorsBySlug(year: number, slug: string): string[] {
    const yearData = gsocMentors.find((y) => y.year === year);
    const project = yearData?.projects.find((p) => p.slug === slug);
    return project?.mentors ?? [];
}

/** Get all project mentors for a year */
export function getMentorsByYear(year: number): GsocProjectMentors[] {
    const yearData = gsocMentors.find((y) => y.year === year);
    return yearData?.projects ?? [];
}

export default gsocMentors;

type RepositorySlug = `${string}/${string}`;

type GiscusConfig = {
  repo: RepositorySlug;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: "url" | "pathname" | "title" | "og:title" | "specific" | "number";
  term: string;
  reactionsEnabled: "0" | "1";
  emitMetadata: "0" | "1";
  inputPosition: "top" | "bottom";
  lang: string;
  loading: "lazy" | "eager";
};

const DEFAULT_GISCUS_CONFIG = {
  repo: "rudra-iitm/openprinting.github.io",
  repoId: "R_kgDOOJ9tYQ",
  category: "Blog Comments",
  categoryId: "DIC_kwDOOJ9tYc4C4B5V",
  mapping: "url",
  term: "Welcome to OpenPrinting Blog",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "en",
  loading: "lazy",
} as const satisfies GiscusConfig;

type DeploymentConfig = {
  repository: string;
  repositoryOwner: string;
  repositoryName: string;
  basePath: string;
  assetPrefix: string;
  siteUrl: string;
  links: {
    home: string;
    cups: string;
    feed: string;
  };
};

type SiteConfig = {
  deployment: DeploymentConfig;
  giscus: GiscusConfig;
};

type EnvSource = Record<string, string | undefined>;

function getEnvValue(env: EnvSource, names: string[], fallback = ""): string {
  for (const name of names) {
    const value = env[name];
    if (value && value.trim() !== "") {
      return value.trim();
    }
  }

  return fallback;
}

function normalizeRepositorySlug(value: string): string {
  return value.replace(/\.git$/, "").replace(/^https:\/\/github\.com\//, "").replace(/^git@github\.com:/, "");
}

function isRepositorySlug(value: string): value is RepositorySlug {
  const [owner, name, ...rest] = value.split("/");
  return Boolean(owner && name && rest.length === 0);
}

function getRepositoryParts(repository: string): {
  repository: string;
  repositoryOwner: string;
  repositoryName: string;
} {
  const normalizedRepository = normalizeRepositorySlug(repository);
  const [repositoryOwner = "", repositoryName = ""] = normalizedRepository.split("/");

  return {
    repository: normalizedRepository,
    repositoryOwner,
    repositoryName,
  };
}

function getDerivedBasePath(isProd: boolean, repositoryOwner: string, repositoryName: string): string {
  if (!isProd || !repositoryName) {
    return "";
  }

  const isRootPagesRepo = repositoryName === `${repositoryOwner}.github.io`;
  return isRootPagesRepo ? "" : `/${repositoryName}`;
}

function getDerivedSiteUrl(repositoryOwner: string, repositoryName: string): string {
  if (!repositoryOwner || !repositoryName) {
    return "";
  }

  const isRootPagesRepo = repositoryName === `${repositoryOwner}.github.io`;
  return isRootPagesRepo
    ? `https://${repositoryOwner}.github.io`
    : `https://${repositoryOwner}.github.io/${repositoryName}`;
}

export function getDeploymentConfig(env: EnvSource): DeploymentConfig {
  const isProd = env.NODE_ENV === "production";
  const repository = getEnvValue(
    env,
    ["NEXT_PUBLIC_SITE_REPOSITORY", "SITE_REPOSITORY", "GITHUB_REPOSITORY"],
    "",
  );
  const { repositoryOwner, repositoryName } = getRepositoryParts(repository);

  const basePath = getEnvValue(
    env,
    ["NEXT_PUBLIC_SITE_BASE_PATH", "SITE_BASE_PATH"],
    getDerivedBasePath(isProd, repositoryOwner, repositoryName),
  );
  const siteUrl = getEnvValue(
    env,
    ["NEXT_PUBLIC_SITE_URL", "SITE_URL"],
    getDerivedSiteUrl(repositoryOwner, repositoryName),
  );
  const home = getEnvValue(
    env,
    ["NEXT_PUBLIC_SITE_HOME_URL", "SITE_HOME_URL"],
    siteUrl || basePath || "/",
  );
  const cups = getEnvValue(
    env,
    ["NEXT_PUBLIC_SITE_CUPS_URL", "SITE_CUPS_URL"],
    siteUrl ? `${siteUrl}/cups/` : `${basePath}/cups/`,
  );
  const feed = getEnvValue(
    env,
    ["NEXT_PUBLIC_SITE_FEED_URL", "SITE_FEED_URL"],
    `${basePath}/feed.xml`,
  );

  return {
    repository,
    repositoryOwner,
    repositoryName,
    basePath,
    assetPrefix: basePath ? `${basePath}/` : "",
    siteUrl,
    links: {
      home,
      cups,
      feed,
    },
  };
}

function getPublicEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

function getPublicRepositoryEnv(name: string, fallback: string): RepositorySlug {
  const value = getPublicEnv(name, fallback);
  return isRepositorySlug(value) ? value : "openprinting/openprinting.github.io";
}

const deployment = getDeploymentConfig(process.env);

export const siteConfig: SiteConfig = {
  deployment,
  giscus: {
    repo: getPublicRepositoryEnv("NEXT_PUBLIC_GISCUS_REPO", DEFAULT_GISCUS_CONFIG.repo),
    repoId: getPublicEnv("NEXT_PUBLIC_GISCUS_REPO_ID", DEFAULT_GISCUS_CONFIG.repoId),
    category: getPublicEnv("NEXT_PUBLIC_GISCUS_CATEGORY", DEFAULT_GISCUS_CONFIG.category),
    categoryId: getPublicEnv("NEXT_PUBLIC_GISCUS_CATEGORY_ID", DEFAULT_GISCUS_CONFIG.categoryId),
    mapping: getPublicEnv("NEXT_PUBLIC_GISCUS_MAPPING", DEFAULT_GISCUS_CONFIG.mapping) as GiscusConfig["mapping"],
    term: getPublicEnv("NEXT_PUBLIC_GISCUS_TERM", DEFAULT_GISCUS_CONFIG.term),
    reactionsEnabled: getPublicEnv("NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED", DEFAULT_GISCUS_CONFIG.reactionsEnabled) as GiscusConfig["reactionsEnabled"],
    emitMetadata: getPublicEnv("NEXT_PUBLIC_GISCUS_EMIT_METADATA", DEFAULT_GISCUS_CONFIG.emitMetadata) as GiscusConfig["emitMetadata"],
    inputPosition: getPublicEnv("NEXT_PUBLIC_GISCUS_INPUT_POSITION", DEFAULT_GISCUS_CONFIG.inputPosition) as GiscusConfig["inputPosition"],
    lang: getPublicEnv("NEXT_PUBLIC_GISCUS_LANG", DEFAULT_GISCUS_CONFIG.lang),
    loading: getPublicEnv("NEXT_PUBLIC_GISCUS_LOADING", DEFAULT_GISCUS_CONFIG.loading) as GiscusConfig["loading"],
  },
};

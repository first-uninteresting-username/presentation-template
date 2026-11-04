{pkgs, ...}: {
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_26;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };

  env.ASTRO_TELEMETRY_DISABLED = "1";

  git-hooks.hooks = {
    alejandra.enable = true;
    prettier.enable = true;
    check-merge-conflicts.enable = true;
    end-of-file-fixer.enable = true;
    trim-trailing-whitespace.enable = true;
  };
}

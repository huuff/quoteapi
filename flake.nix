{
  description = "Nice quote box with happy and motivational quotes to make your day jollier!";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, ... }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in with pkgs;
  {
    devShell.${system} = mkShell {
      buildInputs = [ nodejs-17_x nodePackages.npm ];
    };
  };
}

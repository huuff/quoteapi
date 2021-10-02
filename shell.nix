{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    redoc-cli 
    openapi-generator-cli-unstable
  ];
}

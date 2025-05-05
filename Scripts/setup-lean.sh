#!/bin/bash
# Install elan if not already installed
if ! command -v elan &> /dev/null
then
    curl https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh -sSf | sh -s -- -y
    source ~/.profile
fi

# Make sure we're using the right Lean version
cd /workspaces/Reflections/Sites/Lean
elan override set $(cat lean-toolchain)

# Create or update lakefile.toml with mathlib dependency
cat > lakefile.toml << 'EOL'
name = "LeanProject"
version = "0.1.0"

[dependencies]
mathlib = {git = "https://github.com/leanprover-community/mathlib4.git", rev = "master"}
EOL

# Update dependencies
lake update

# Build the project
lake build
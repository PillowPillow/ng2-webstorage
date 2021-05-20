#!/usr/bin/env bash

project=$1
version_command=$2

dir=$(pwd)
wdir=$dir/projects/$project
basedir=$(dirname "$0")

if [ ! -f "$wdir/package.json" ];
then
	echo ERROR: project $project doesn\'t exists
	exit 1
fi

if [ "$version_command" = "" ];
then
	version_command="patch"
fi


if [ "$version_command" != "none" ];
then
  cd $wdir;
  npm version $version_command
  cd $dir
fi

pkg_version=$(sh $basedir/package_info.sh $1 "version" "projects")

echo "new version : $project@$pkg_version"

git tag "$project@$pkg_version"

if [ "$version_command" != "none" ];
then
  git add $wdir/package.json
  git commit -m "bump $project to $pkg_version"
fi


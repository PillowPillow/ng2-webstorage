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


cd $wdir;
npm version $version_command
cd $dir

pkg_version=$(sh $basedir/package_info.sh $1 "version" "projects")

git tag $pkg_version

echo "npm version : $pkg_version"
echo "created git tag $pkg_version"
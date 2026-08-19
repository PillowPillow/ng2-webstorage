#!/usr/bin/env bash

project=$1

dir=$(pwd)
wdir=$dir/dist/$project
basedir=$(dirname "$0")

if [ ! -d "$wdir" ];
then
	echo ERROR: project $project doesn\'t exists
	exit 1
fi

pkg_version=$(sh $basedir/package_info.sh $1 "version")
pkg_name=$(sh $basedir/package_info.sh $1 "name")

npm_version=$(npm show $pkg_name version)

echo "pkg name : $pkg_name"
echo "pkg version : $pkg_version"
echo "npm version : $npm_version"

if [ "$pkg_version" != "$npm_version" ];
then
	if ! npm publish $wdir;
	then
		echo "ERROR: npm publish failed for $pkg_name@$pkg_version"
		exit 1
	fi
	echo "$pkg_name@$pkg_version [updated]"
else
	echo "$pkg_name@$pkg_version [up_to_date]"
fi

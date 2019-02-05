#!/usr/bin/env bash

project=$1
prop=$2
project_dir=$3

if [ "$prop" = "" ];
then
	prop="version"
fi

if [ "$project_dir" = "" ];
then
	project_dir="dist"
fi

dir=$(pwd)
wdir=$dir/$project_dir/$project

cd $wdir
echo $(node -p "require('./package.json').$prop")
cd $dir

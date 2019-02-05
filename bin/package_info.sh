#!/usr/bin/env bash

project=$1
prop=$2

if [ "$prop" = "" ];
then
	prop="version"
fi


dir=$(pwd)
wdir=$dir/dist/$project

cd $wdir
echo $(node -p "require('./package.json').$prop")
cd $dir

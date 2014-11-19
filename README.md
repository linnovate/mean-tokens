# Mean Tokens


Mean Tokens is a small addon package for mean.io that enables inline editing of all values which are enabled as "mean-token"

The package makes use of the role system within mean to control who is able to edit tokens. Currently only "admin" has the required permissions to edit tokens.

# Annoucement

This **package is now obsolete**. The new package which is actively being developed is at https://git.mean.io/linnovate/mean-tokens.

As new code is no longer being pushed on this repo, it is unlikely that issues will be tracked here effectively. So the new alternative should be used as soon as possible as issues will be acitvely tracked and fixed on git.mean.io for all mean-packages. 


## Basic Usage

  Install Mean CLI:

    $ sudo npm install -g meanio

  Create a new mean app:

    $ mean init <NameOfYourApp>
    
  Install Dependencies:

    $ cd <NameOfYourApp> && npm install
    
  Install mean-tokens:

    $ mean install mean-tokens

  Run your app:

    $ grunt
    
  Once you have a user assign the user the admin role:
  
    $ mean user <email> -a admin
    
  

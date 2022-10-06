# mdlr-realworld
Implementing The RealWorld app with MDLR

# rationale
I have been experimenting with building my own 'framework' for a while now. The quotes are deliberate as I personally do not see it as framework but more a development philosophy to minimize dependency, reduce build times to almost zero and enable the TDD red, green, refactor cycle. MDLR has progressed to a stage that apps can be build with it as well as backends. So next to the mdlr-turtorials an example app is needed. And that brings us to RealWorld...

# getting started
1) docker-compose up
2) open [realworld-dev](https://localhost:8443/bundler/html?unit=[html]realworld-app) in browser

# pages

## Publish to GitHub pages
```Bash
curl -ks 'https://localhost:8443/bundler/html?unit=\[html\]realworld' | gunzip > docs/index.html
```
and commit and push

## current version
[mdlr-realworld](https://kootstra-rene.github.io/mdlr-realworld/index.html#/)

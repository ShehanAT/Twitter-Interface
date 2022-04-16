app has exceeded 244kb limit(currently at 343kb) so use code splitting to split 
the code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time
There are three approaches to code splitting: 
* Entry Points: Manually split code using entry configuration(easiest way )
* Prevent Duplication: Use the SplitChunksPlugin to dedupe and split chunks
* Dynamic Imports: Split code via inline function calls within modules
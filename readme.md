1) Without any plugins, each entry has its on depedencies and does not share anything. 

2) ExtractCommon moves shared libraries into new chunk. Default minChunks: 3, (Modules must be shared between 3 entries)

3) Making minChunks: 1, will include everthing in common chunk leaving entry chunk at 25bytes.

4) If you want multiple common chunk bundles, you'll have to specify all chunks details for each common bundle like shown in the example.
        

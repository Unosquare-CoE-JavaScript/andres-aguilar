### Table of contents: <!-- omit in toc -->

- [Chapter 4: Around the Global Scope](#chapter-4-around-the-global-scope)
    - [Why Global Scope?](#why-global-scope)

# Chapter 4: Around the Global Scope

The global scope of a JS program is a rich topic, with much more utility and nuance than you would likely assume.

This chapter first explores how the global scope is (still) useful and relevant to writing JS programs today, then looks at differences in where and *how to access* the global scope in different JS environments.

Fully understanding the global scope is critical in your mas- tery of using lexical scope to structure your programs.

### Why Global Scope?

It’s likely no surprise to readers that most applications are composed of multiple (sometimes many!) individual JS files.

So how exactly do all those separate files get stitched together in a single runtime context by the JS engine?

With respect to browser-executed applications, there are three main ways.

**First**, if you’re directly using ES modules (not transpiling them into some other module-bundle format), these files are loaded individually by the JS environment.

Each module then imports references to whichever other modules it needs to access.

The separate module files cooperate with each other exclusively through these shared imports, without needing any shared outer scope.

**Second**, if you’re using a bundler in your build process, all the files are typically concatenated together before delivery to the browser and JS engine,
which then only processes one big file. Even with all the pieces of the application co-located in a single file, some mechanism is necessary for each piece to register a name to be referred to by other pieces, as well as some facility for that access to occur.


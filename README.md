# spanner (and friends!)

**Goal:** Standalone Spanner (and optional Vampire/Colorist/Embalmer) library that can be added to any project using markdown conversion, or ideally anything at all

**Status:** Extremely WIP 

# Contents

**Before load:** *Spanner*

**After load:** *Vampire*, *Colorist*, and *Embalmer* (collectively aka *Triad*)

## Spanner

**Note:** Spanner depends on grapheme-splitter.

Spanner is a tool for taking raw HTML, breaking the content found *outside* HTML tags into individual graphemes, and returning that HTML to be used in the page instead of the original.

#### Why would I want that?

While the original purpose is to create easier-reading gradients (for more about that, read on), 

### Variables
- Spanner takes your body (or other) text in fresh HTML form as `meat`.
- Text during processing is `raw`. (This will probably not be relevant to you.)
- The div containing Spanner's end product has the class name `corpse`. (Changing this will break the Triad.)
- The class name for resulting `span` tags is always going to be `glyph`.

## Vampire

Vampire runs after page load (lazily, to be specific) in order to determine things about the individual user's viewport. It uses the `glyph` class to determine the location of line breaks (via offset) and the length of the longest line in the given `corpse`. (Running off of the longest line prevents packing a weird-looking gradient into the incomplete line break of the end of a paragraph.)

#### Why would I want *that*?

I don't know, do you want to do something to each line of text based on user viewport width? It's literally just for enabling doing something to each letter in each independent line of text based on your user's viewport width, I don't know what else you expected.

#### I didn't expect it to be named *Vampire*.

It counts things.

### Variables
- Vampire must be able to fetch a `corpse` from the page once loaded.
- Output is stored in a two-item array named `vial`. 

## Colorist

**Note:** Colorist depends on javascript-color-gradient.

Colorist takes the maximum line length and number of lines within the `corpse` as rendered, and generates gradients to be used on the individual `glyph`s that take each line from one color to another in an order that's (hopefully) harmonious when viewed together.

#### What's the catch?

Currently, while Colorist is reusable *for me*, I hand-code the colors it uses into every relevant project, partly because the first draft code used color names to make the pendulum effect of creating gradients in order easier for me to parse as I wrote. This is obviously suboptimal. 

### Variables
- Colorist requires Vampire's `vial` and outputs an array of strings (one per line) named `palette`.
- Variables for differentiating or customizing colors TBD.

## Embalmer

Embalmer is the step that actually fills in the gradient-making content into the `span` tags in the on-load version of the `corpse`.

#### ...And it's called that because it makes the `corpse` presentable.

Yep!

### Variables 
- Embalmer requires Colorist's `palette` and Vampire's `vial`.
- Embalmer replaces the inner HTML of a `corpse`.

# Functional goal 

#### For stable release:
- Compiler-agnostic import of HTML intended for display 
- Make the subsequent hot potato with `corpse` work reliably 
- Add predetermined light and dark text themes 
- Add ability for user to select light or dark when adding an instance of Colorist
- *Would* it be possible to (re)write in vanilla JS to increase cross-compatibility?
- Appropriate end user instructions

#### Add features beyond "exists, is stable":
- Move limitation on having the lads run on too short of lines earlier in the process 
- Make Embalmer better at maps instead of depending on for loops as much 
- Make Embalmer restart from the beginning of a `palette` if it runs out of colors so Colorist can determine array size based solely on desired colors 

#### Add user-determined colors: 
- Colorist must generate gradient start/end points automatically 
- How to take arbitrary inputs? 
- Functional cap on number of colors (what becomes suboptimal?)
- Change paired gradient production to a for loop 
- Optional: add mode that's straight 'rainbow' instead of oscilating around a base color 

#### Add automatic determination of colors: 
- Determine how to effectively fetch text and background colors for page: can the rest of the site's stylesheet be imported? (What does that do to Tailwind users?) Can it be detected otherwise? Would `getElementByClassName` on `corpse` cover it?
- Find a way to integrate WCAG into determination of additional colors (additional: is it possible to avoid colors already used for links?)
- Error on impossible/inaccessible pages? (In terms of text/background contrast) 
- Generate colors for gradient 
- Arrange ability to pass those colors to Embalmer as normal

#### Add alternate tool for custom desired `span` outcome, or `spoutcome`, after load:
- Create function that fills `glyph`s with an undetermined *something*
- Write instructions for user addition of *something* 
- Require alternate variable names (goodbye `corpse`...)

#### Add ability to append custom content in Spanner's tags *before* load:
- Make this Spanner take two inputs (`meat` and the desired additions) 
- Add additional tag/s content to `span` production

#### Add ability to run lads after load (lot of lag risk here):
- Ability for Spanner to run after load 
- Ability for Spanner to act on arbitrary parts of the page 

#### Long-term QOL improvements 
- Let Embalmer add/change other features (e.g. increase text size, switch font to Dyslexie or other user-determined readable preference) of the text *while* applying colors, and have that happen in a `div` surrounding Embalmer's output 
- Create stripped-down versions for people who know what they want so there aren't conflicting options 
- Move some user interaction to a settings file instead of requiring specific inputs, same for user-generated constants 
- Client-side plugin usages 

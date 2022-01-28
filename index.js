import cursed from './lib/index.js'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

spanner()

async function spanner() {
 const body = 
 
 unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process()

 var meat = String(body);
 cursed(meat);
}
import express from 'express'
import { parse } from 'csv-parse'
import type { ReadableStream as WebReadableStream } from "node:stream/web";
import { Stream } from 'stream'
    
const router = express.Router()

/**
 * @example
 * ```bash
 * curl -X POST -d '{ "url": "https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv" }' -H "Content-Type: application/json" http://localhost:4000/api/csv/ingest 
 * ```
 */
router.post('/ingest', async (req, res) => {
  if (!req.body.url) {
    return res.status(400).send('url is required')
  }

  const { url } = req.body

  try {
    new URL(url)
  } catch (e) {
    return res.status(400).send('url is not valid')
  }

  const readStream = await fetch(url).then(r => Stream.Readable.fromWeb(r.body as WebReadableStream));

  const parser = parse({
    delimiter: ',',
    columns: true,
  })

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  let isFirstLine = true

  res.write('[\n')

  readStream
    .pipe(parser)
    .on('data', (row) => {
      if (!isFirstLine) {
        res.write(',\n')
      }
      res.write(JSON.stringify(row))
      isFirstLine = false
    }) 
    .on('end', () => {
      res.write('\n]')
      res.end()
    })
    .on('error', (err) => {
      res.status(400).send(err)
    })
})

export default router
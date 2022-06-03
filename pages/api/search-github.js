// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { githubQueries, TYPES } from './queries/query';

export default async function handler(req, res) {
    const token = process.env.SECRET_KEY;
    const { q:query, type, cursor, limit=10 } = req.query;

    if (!TYPES.includes(type)) res.status(400).json({status: "type invalid"});

    const graphQLquery = githubQueries({
        query: query,
        type: type,
        cursor: cursor,
        limit: limit
    });
  
  
    await fetch(`https://api.github.com/graphql`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(graphQLquery)
    })
        .then(res => res.json())
        .then(data => {
            if (!!data.errors) throw Error(data.errors[0].message);
            res.status(200).json({ ...data, status: "ok" });
        })
        .catch(error => {
            console.log("error", error.message)
            res.status(400).json(error.message)
        });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryGithub } from './queries/query';

export default async function handler(req, res) {
    const token = process.env.SECRET_KEY;
    const query = queryGithub({
        query: "pydew",
        type: "REPOSITORY"
    });


    await fetch(`https://api.github.com/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(query)
    })
        .then(response => response.json())
        .then(data => {
            if (!!data.errors) throw Error(data.errors[0].message)
            res.status(200).json(data.data.search)
        })
        .catch(error => res.status(400).json(error.message));
}

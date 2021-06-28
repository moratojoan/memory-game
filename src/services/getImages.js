

export function getImages() {
    return new Promise(resolve => {
        fetch("https://api.github.com/repos/facebook/react/contributors")
        .then(response => {
            if(!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(contributors => {
            const images = transformContributors(contributors);
            resolve(images);
        })
        .catch(error => console.log(error));
    });
}

function transformContributors(contributors) {
    return contributors.map(({
        id,
        avatar_url,
        login
    }) => ({
        id,
        url: avatar_url,
        alt: login
    }));
}

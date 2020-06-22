import request from './request'

async function derive({url,ids,filename}) {
    let res = await request({
        url: url,
        method: "GET",
        params: {
            ids
        },
        responseType: "blob"
    });
    const blob = new Blob([res], {
        type: "application/octet-stream"
    });
    const fileName = filename+".xls";
    const linkNode = document.createElement("a");

    linkNode.download = fileName;
    linkNode.style.display = "none";
    linkNode.href = URL.createObjectURL(blob);
    document.body.appendChild(linkNode);
    linkNode.click();

    URL.revokeObjectURL(linkNode.href);
    document.body.removeChild(linkNode);
}
export {
    derive
}

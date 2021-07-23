import path from 'path';
const fs = require('fs').promises;

function ProductDetailPage(props) {
    const { loadedProduct } = props;
    //console.log('loadedProduct', loadedProduct);

    if(!loadedProduct){
        return <p>Loading.......</p>
    }
    return (
        <>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </>
    )
}

async function getData(){
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export async function getStaticProps(context) {
   // console.log(context);
    const { params } = context;
    console.log('parmas', params);
    const productId = params.pid;
    //const fs = require('fs').promises;
   const data = await getData();
 
    const product = data.products.find(product => product.id === productId);

    if(!product){
        return { notFound: true}
    }
    return {
        props:{
            loadedProduct : product
        }
    };
}


export async function getStaticPaths(){
    //const fs = require('fs').promises;
    const data = await getData();

    const dynamicPaths = data.products.map((item) => {
        return { params: { pid: item.id } };
    });
    // console.log(dynamicPaths)
    return {
        paths:dynamicPaths,
        fallback: true //'blocking' or true
    };
}

export default ProductDetailPage;
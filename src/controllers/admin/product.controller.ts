import { Request, Response } from "express"
import { getProductById, handleCreateProduct, handleDeleteProduct, handleUpdateProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getAdminCreateProduct = async (req: Request, res: Response) => {
    const errors = [];
    const oldFormData = {
        name: '',
        price: '',
        detailDesc: '',
        shortDesc: '',
        factory: '',
        quantity: '',
        target: ''
    }
    return res.render('admin/product/create.ejs', {
        errors,
        oldFormData
    });
}

const postCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, factory, quantity, sold, target } = req.body as TProductSchema;
    const image = req.file?.filename || undefined;
    const validateProduct = ProductSchema.safeParse(req.body);
    const oldFormData = {
        name: name,
        price: price,
        detailDesc: detailDesc,
        shortDesc: shortDesc,
        factory: factory,
        quantity: quantity,
        target: target
    }
    if (!validateProduct.success) {
        const errorsZod = validateProduct.error.issues;
        const errorIssue = errorsZod?.map((error) => `${error.path[0]}: ${error.message}`);
        return res.render('admin/product/create.ejs', {
            errors: errorIssue,
            oldFormData: oldFormData
        });
    }
    const newProduct = await handleCreateProduct(
        name, +price, detailDesc, shortDesc, factory, +quantity, target, image
    )

    return res.redirect('/admin/product',);
}
const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id);
    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];
    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render('admin/product/detail.ejs', {
        product: product,
        factoryOptions: factoryOptions,
        targetOptions: targetOptions,
    });
}

const postUpdadeProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, factory, quantity, sold, target } = req.body as TProductSchema;
    const image = req.file?.filename || undefined;
    await handleUpdateProduct(
        id, name, +price, detailDesc, shortDesc, factory, +quantity, target, image)
    return res.redirect('/admin/product',);
}

const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteProduct(id);
    return res.redirect('/admin/product',);
}


export { getAdminCreateProduct, postCreateProduct, getViewProduct, postUpdadeProduct, postDeleteProduct }
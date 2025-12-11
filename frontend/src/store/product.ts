import { create } from 'zustand';
interface Product {
  _id: string,
  name: string;
  price: string;
  image: string;
}

interface newProduct {
  name: string;
  price: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (newProduct: newProduct) => Promise<{ success: boolean; message: string }>;
  getProducts: (filters?: string[]) => void;
  deleteProduct: (id: string) => Promise<{success: boolean; message: string }>;
  updateProduct: (id:string, product: Product) => Promise<{success: boolean, message: string}>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message}
    } else {
        set((state) => ({
          products: [...state.products, data.data]
        }))
        return { success: true, message: 'Product created successfully'}
    }
  },

  getProducts: async (filters?: string[]) => {
    const limit = 10;
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    if( filters && filters.length > 0 ) {
      params.set("categories", filters.join(","));
    }

    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    set({products: data.data});
  },

  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();

    if (!data.success) {
      return {success: false, message: data.message}
    } else {
      set((state) => ({
        products: state.products.filter(p => p._id !== id)
      }))
      
        return {success: true, message: 'Product is removed'}
    }
  },

  updateProduct: async(id, product) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body:  JSON.stringify(product)
    })

    const data = await res.json();
    if (!data.success ) {
      return {success: false, message: data.message}
    } else {
       set((state) => ({
        products: state.products.map(p => p._id === id ? product : p)
      }))
      return {success: true, message: 'Product is updated successfully'}
    }
  },

}))


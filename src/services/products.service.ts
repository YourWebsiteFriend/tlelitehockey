import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { Product, ProductCategory } from '@/types/product';

export async function getProducts(options?: {
  category?: ProductCategory;
  limit?: number;
}): Promise<Product[]> {
  try {
    const supabase = await getSupabaseServerClient();

    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (options?.category !== undefined) {
      query = query.eq('category', options.category);
    }

    if (options?.limit !== undefined) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[products.service] getProducts error:', error);
      return [];
    }

    return (data as Product[]) ?? [];
  } catch (err) {
    console.error('[products.service] getProducts unexpected error:', err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('[products.service] getProductBySlug error:', error);
      return null;
    }

    return (data as Product) ?? null;
  } catch (err) {
    console.error('[products.service] getProductBySlug unexpected error:', err);
    return null;
  }
}

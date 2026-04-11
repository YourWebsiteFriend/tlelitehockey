"use client";

import { useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/shop/CartContext";
import { createShopCheckout } from "@/actions/checkout.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const result = await createShopCheckout(items);
      if (result.success) {
        window.location.href = result.data.checkoutUrl;
      } else {
        alert(result.error ?? "Something went wrong at checkout.");
      }
    } catch {
      alert("Something went wrong at checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-[#111111] border-l border-white/10 z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-white font-black uppercase tracking-wide text-lg">
            CART{" "}
            {itemCount > 0 && (
              <span className="text-[#F78E2B] text-sm">({itemCount})</span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/40 text-sm">
              Your cart is empty
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-4 bg-black rounded-xl p-4 border border-white/10"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-[#F78E2B] text-sm font-black mt-1">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-white/10">
            <div className="flex justify-between mb-6">
              <span className="text-white/60 text-sm uppercase tracking-wide">
                Subtotal
              </span>
              <span className="text-white font-black text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#F78E2B] rounded-full py-4 text-white font-black uppercase text-sm tracking-widest hover:bg-[#e07e22] transition-colors disabled:opacity-50"
            >
              {loading ? "LOADING..." : "CHECKOUT"}
            </button>
            <button
              onClick={clearCart}
              className="w-full text-white/30 text-xs mt-3 hover:text-white/50 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

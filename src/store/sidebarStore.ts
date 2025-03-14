import { create } from "zustand";

type SidebarState = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  selectedPageName: string;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
  setSelectedPageName: (name: string) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,
  selectedPageName: "Dashboard",
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setIsHovered: (isHovered) => set({ isHovered }),
  setActiveItem: (activeItem) => set({ activeItem }),
  toggleSubmenu: (item) =>
    set((state) => ({
      openSubmenu: state.openSubmenu === item ? null : item,
    })),
  setSelectedPageName: (name) => set({ selectedPageName: name }),
}));

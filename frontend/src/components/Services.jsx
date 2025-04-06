// frontend/src/components/Services.jsx
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { CATEGORIES_QUERY } from "../graphql/services.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Services = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [search, setSearch] = useState("");

  const { data, loading, error, refetch } = useQuery(CATEGORIES_QUERY, {
    variables: {
      page,
      itemsPerPage,
      sortBy,
      sortOrder,
      priceMin: priceMin ? parseFloat(priceMin) : undefined,
      priceMax: priceMax ? parseFloat(priceMax) : undefined,
      search: search || undefined,
    },
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1); // Reset to first page when sorting
  };

  const handleFilter = () => {
    setPage(1); // Reset to first page when filtering
    refetch();
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page when searching
    refetch();
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setPage(1); // Reset to first page when changing items per page
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <pre className="text-red-500">{error.message}</pre>;

  const { items, totalItems, currentPage, totalPages, itemsPerPage: currentItemsPerPage } = data?.services || {};

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nội dung chính */}
      <div className="flex-1 container mx-auto p-6">
        <br />
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Services</h1>

        {/* Search */}
        <div className="mb-4 flex justify-center">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        {/* Filtering */}
        <div className="mb-4 flex justify-center space-x-4">
          <div>
            <Label htmlFor="priceMin">Price Min:</Label>
            <Input
              id="priceMin"
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-32"
            />
          </div>
          <div>
            <Label htmlFor="priceMax">Price Max:</Label>
            <Input
              id="priceMax"
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-32"
            />
          </div>
          <Button onClick={handleFilter}>Filter</Button>
        </div>

        {/* Sorting */}
        <div className="mb-4 flex justify-center space-x-4">
          <Button onClick={() => handleSort("price")}>
            Sort by Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button onClick={() => handleSort("name")}>
            Sort by Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
        </div>

        {/* Pagination Info */}
        <div className="mb-4 text-center text-gray-600">
          <p>Total Items: {totalItems}</p>
          <p>Items on this page: {items?.length || 0}</p>
          <p>Current Page: {currentPage}</p>
          <p>Total Pages: {totalPages}</p>
        </div>

        {/* Items Per Page Selection */}
        <div className="mb-4 flex justify-center">
          <Label htmlFor="itemsPerPage" className="mr-2">Items per page:</Label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded-lg px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Service List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items?.length > 0 ? (
            items.map((service) => (
              <Link key={service._id} to={`/Service/${service._id}`}>
                <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                  {service.image && (
                    <img
                      src={`https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/img/${service.image}`}
                      alt={service.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-700">{service.name}</h2>
                  <p className="text-gray-600">{service.description}</p>
                  <p className="text-gray-800 font-bold mt-2">{service.price} VND</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full">No services available</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center space-x-2">
          <Button
            onClick={() => setPage(1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
          >
            First
          </Button>
          <Button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
          >
            Next
          </Button>
          <Button
            onClick={() => setPage(totalPages)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
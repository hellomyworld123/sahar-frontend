import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Toast, Modal, TextInput, Select, Datepicker } from 'flowbite-react';
import { HiCheck, HiX, HiTrash, HiSearch } from 'react-icons/hi';
import Papa from 'papaparse';
import debounce from 'lodash/debounce';

const AdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  
  // Search and filter states
  const [searchParams, setSearchParams] = useState({
    service: '',
    startDate: '',
    endDate: '',
    status: '',
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const fetchReservations = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit,
        ...searchParams,
      });

      const response = await fetch(`/api/reservations?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch reservations');
      const data = await response.json();
      setReservations(data.reservations);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      showNotification('Error fetching reservations', 'error');
    }
  }, [currentPage, limit, searchParams]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const debouncedSearch = useCallback(
    (newParams) => {
      const debouncedFn = debounce((params) => {
        setSearchParams(params);
        setCurrentPage(1); // Reset to first page on new search
      }, 300);
      debouncedFn(newParams);
    },
    [setSearchParams, setCurrentPage]
  );

  const handleSearchChange = (field, value) => {
    const newParams = { ...searchParams, [field]: value };
    debouncedSearch(newParams);
  };

  const updateReservationStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update reservation');

      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === id ? { ...reservation, status } : reservation
        )
      );

      showNotification(`Reservation ${status} successfully`, 'success');
    } catch (error) {
      showNotification('Error updating reservation', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reservation');

      setReservations(prevReservations =>
        prevReservations.filter(reservation => reservation.id !== id)
      );

      showNotification('Reservation deleted successfully', 'success');
      setShowDeleteModal(false);
    } catch (error) {
      showNotification('Error deleting reservation', 'error');
    }
  };

  const showNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(reservations);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'reservations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Reservations Management</h1>
        <Button onClick={exportToCSV}>Export CSV</Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <TextInput
          icon={HiSearch}
          placeholder="Search by service..."
          value={searchParams.service}
          onChange={(e) => handleSearchChange('service', e.target.value)}
        />
        <Datepicker
          placeholder="Start Date"
          value={searchParams.startDate}
          onSelectedDateChanged={(date) => handleSearchChange('startDate', date.toISOString())}
        />
        <Datepicker
          placeholder="End Date"
          value={searchParams.endDate}
          onSelectedDateChanged={(date) => handleSearchChange('endDate', date.toISOString())}
        />
        <Select
          value={searchParams.status}
          onChange={(e) => handleSearchChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>Service</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {reservations.map((reservation) => (
            <Table.Row 
              key={reservation.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedReservation(reservation);
                setShowModal(true);
              }}
            >
              <Table.Cell>{reservation.service}</Table.Cell>
              <Table.Cell>{new Date(reservation.date).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{reservation.time}</Table.Cell>
              <Table.Cell>{reservation.name}</Table.Cell>
              <Table.Cell>{reservation.phone}</Table.Cell>
              <Table.Cell>{reservation.email}</Table.Cell>
              <Table.Cell>{reservation.status}</Table.Cell>
              <Table.Cell>{new Date(reservation.createdAt).toLocaleString()}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="xs"
                    color="success"
                    onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                    disabled={reservation.status === 'confirmed'}
                  >
                    <HiCheck className="mr-2 h-4 w-4" />
                    Confirm
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                    disabled={reservation.status === 'cancelled'}
                  >
                    <HiX className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => {
                      setReservationToDelete(reservation);
                      setShowDeleteModal(true);
                    }}
                  >
                    <HiTrash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <Button
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </Button>
      </div>

      {/* Detail Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Reservation Details</Modal.Header>
        <Modal.Body>
          {selectedReservation && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Service</h3>
                <p>{selectedReservation.service}</p>
              </div>
              <div>
                <h3 className="font-semibold">Date & Time</h3>
                <p>{new Date(selectedReservation.date).toLocaleDateString()} at {selectedReservation.time}</p>
              </div>
              <div>
                <h3 className="font-semibold">Customer Information</h3>
                <p>Name: {selectedReservation.name}</p>
                <p>Phone: {selectedReservation.phone}</p>
                <p>Email: {selectedReservation.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <p>{selectedReservation.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Created At</h3>
                <p>{new Date(selectedReservation.createdAt).toLocaleString()}</p>
              </div>
              {selectedReservation.notes && (
                <div>
                  <h3 className="font-semibold">Notes</h3>
                  <p>{selectedReservation.notes}</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this reservation? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={() => handleDelete(reservationToDelete?.id)}>
            Delete
          </Button>
          <Button color="gray" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      {showToast && (
        <Toast className="fixed bottom-4 right-4">
          <div className={`text-sm font-medium ${toastType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {toastMessage}
          </div>
        </Toast>
      )}
    </div>
  );
};

export default AdminPanel; 
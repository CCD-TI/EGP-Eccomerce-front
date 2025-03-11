"use client";
//Manejar estados
import React, { useContext, useEffect, useState } from "react";
//Componentes UI
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Tooltip,
} from "@nextui-org/react";
//Iconos
import {
    MagnifyingGlassIcon,
    TicketIcon,
    UserPlusIcon,
} from "@heroicons/react/24/solid";
//Extra
/**/
import { useSession } from "next-auth/react";
import ModalCrearCursoComponent from "../modal/modalcrearcurso";
import { MdModeEdit } from "react-icons/md";
import ModalEditarCursoComponent from "../modal/modaleditarcurso";
import { iDataTableUsuario } from "@/interfaces/idatatableusuario";
import { environment } from "@/environments/environment";
import ModalCrearUsuario from "../modal/modalcrearusuario";
import ModalEditarUsuario from "../modal/modaleditarusuario";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/**/

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];
const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["UsuarioBloque", "RolBloque", "actions"];
export const columnsSolicitud = [
    { name: "Usuario", uid: "UsuarioBloque", sortable: true },
    { name: "Rol", uid: "RolBloque", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: true },
];
interface Props {
    array: iDataTableUsuario[];
}

export default function DataTableUsuario({ array }: Props) {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set([])
    );
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(array.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columnsSolicitud;

        return columnsSolicitud.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...array];

        if (hasSearchFilter) {
            const lowerCaseFilterValue = filterValue.toLowerCase();

            filteredUsers = filteredUsers.filter(
                (user) =>
                    (user.Usuario &&
                        user.Usuario.toLowerCase().includes(lowerCaseFilterValue)) ||
                    ((user.Nombres + ' ' + user.Apellidos) &&
                        (user.Nombres + ' ' + user.Apellidos).toLowerCase().includes(lowerCaseFilterValue))
            );
        }
        if (
            statusFilter !== "all" &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.Usuario)
            );
        }

        return filteredUsers;
    }, [array, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: iDataTableUsuario, b: iDataTableUsuario) => {
            const first = a[sortDescriptor.column as keyof iDataTableUsuario] as number;
            const second = b[sortDescriptor.column as keyof iDataTableUsuario] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const renderCell = React.useCallback((user: iDataTableUsuario, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof iDataTableUsuario];
        async function desactivaractivarusuario(idusuario: any, tipo: any, valor: any) {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: `Desea ${tipo == 1 ? 'activar' : 'desactivar'} al usuario?`,
                text: `Al acceder a esta opcion ${tipo == 1 ? 'activaras' : 'desactivaras'} al usuario seleccionado`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Sí, ${tipo == 1 ? 'activar' : 'desactivar'}`,
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const listarTemario = await api.post("/inicio/desactivaractivarusuariov2", {
                        fusuario_id: idusuario,
                        festado_id: valor
                    });
                    Swal.fire({
                        title: 'Se realizo el procedimiento correctamente!',
                        text: `Se ha ${tipo == 1 ? 'activado' : 'desactivado'} al usuario`,
                        icon: 'success'
                    });

                }
            });


        }
        async function eliminarusuario(idusuario: any) {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: "Desea eliminar al usuario?",
                text: "Al proceder con la solicitud se eliminar al usuario y sus datos del sistema",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí,eliminarlo",
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const listarTemario = await api.post("/inicio/eliminarusuariov2", {
                        fusuario_id: idusuario
                    });
                    Swal.fire({
                        title: 'Se elimino al usuario con exito!',
                        text: 'Su solicitud tuvo exito',
                        icon: 'success'
                    });

                }
            });


        }
        switch (columnKey) {
            case "UsuarioBloque":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm", src: environment.baseUrlStorage + '/' + user.RutaImagenPerfil }}
                        classNames={{
                            description: "text-default-500",
                        }}
                        description={user.Nombres + ' ' + user.Apellidos}
                        name={user.Usuario}
                    >
                    </User>
                );
            case "RolBloque":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{user.Area}</p>
                        <p className="text-bold text-tiny capitalize text-default-500">{user.Puesto}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <ModalEditarUsuario idusuario={user.IdUsuario} />
                        {user.Estado_id == 1 ? <FaEyeSlash onClick={() => { desactivaractivarusuario(user.IdUsuario, 0, 0) }} />
                            : <FaEye onClick={() => { desactivaractivarusuario(user.IdUsuario, 1, 1) }} />}
                        <FaTrash onClick={() => { eliminarusuario(user.IdUsuario) }} />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        },
        []
    );

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-blue-500/50 border-1 text-white font-semibold",
                        }}
                        placeholder="Buscar"
                        size="sm"
                        startContent={<MagnifyingGlassIcon className="h-5 text-slate-500" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<TicketIcon className="h-5" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columnsSolicitud.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        <ModalCrearUsuario />

                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {array.length} usuarios
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        array.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                        "wrapper": "bg-white",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Todos los items seleccionados"
                        : `${selectedKeys.size} de ${items.length} seleccionados`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({
            table: ["bg-[var(--color-peru)] rounded-xl"],
            wrapper: ["max-h-[382px]"],
            th: [
                "bg-[var(--color-peru)]",
                "font-bold  text-xs",
                "border-b",
                "border-divider",
            ],
            td: [
                // changing the rows border radius
                // first
                "",
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        []
    );

    return (
        <>
            <Table
                isCompact
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                checkboxesProps={{
                    classNames: {
                        wrapper:
                            "after:bg-foreground after:text-background text-background",
                    },
                }}
                classNames={classNames}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No users found"} items={sortedItems}>
                    {(item: iDataTableUsuario) => (
                        <TableRow key={item.IdUsuario}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}

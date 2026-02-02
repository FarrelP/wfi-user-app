import type { User } from "~/types/user"

export function normalizeUser(data: Partial<User>): User {
  return {
    id: Number(data.id),
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    maidenName: data.maidenName ?? "",
    age: data.age ?? 0,
    gender: data.gender ?? "male",
    email: data.email ?? "",
    phone: data.phone ?? "",
    username: data.username ?? "",
    password: data.password ?? "",
    birthDate: data.birthDate ?? "",
    image: data.image ?? "",
    bloodGroup: data.bloodGroup ?? "-O",
    height: data.height ?? 193.24,
    weight: data.weight ?? 63.16,
    eyeColor: data.eyeColor ?? "Green",
    hair: {
      color: data.hair?.color ?? "Brown",
      type: data.hair?.type ?? "Curly",
    },
    ip: data.ip ?? "42.48.100.32",
    address: {
      address: data.address?.address ?? "626 Main Street",
      city: data.address?.city ?? "Phoenix",
      state: data.address?.state ?? "Mississippi",
      stateCode: data.address?.stateCode ?? "",
      postalCode: data.address?.postalCode ?? "29112",
      coordinates: {
        lat: data.address?.coordinates?.lat ?? -77.16213,
        lng: data.address?.coordinates?.lng ?? -92.084824,
      },
      country: data.address?.country ?? "",
    },
    macAddress: data.macAddress ?? "47:fa:41:18:ec:eb",
    university: data.university ?? "University of Wisconsin--Madison",
    bank: {
      cardExpire: data.bank?.cardExpire ?? "05/28",
      cardNumber: data.bank?.cardNumber ?? "3693233511855044",
      cardType: data.bank?.cardType ?? "Diners Club International",
      currency: data.bank?.currency ?? "GBP",
      iban: data.bank?.iban ?? "GB74MH2UZLR9TRPHYNU8F8",
    },
    company: {
      department: data.company?.department ?? "Sales",
      name: data.company?.name ?? "Dooley, Kozey and Cronin",
      title: data.company?.title ?? "Sales Manager",
      address: {
        address: data.company?.address?.address ?? "263 Tenth Street",
        city: data.company?.address?.city ?? "San Francisco",
        state: data.company?.address?.state ?? "",
        stateCode: data.company?.address?.stateCode ?? "",
        postalCode: data.company?.address?.postalCode ?? "",
        coordinates: {
          lat: data.company?.address?.coordinates?.lat ?? 0,
          lng: data.company?.address?.coordinates?.lng ?? 0,
        },
        country: data.company?.address?.country ?? "",
      },
    },
    crypto: {
      coin: data.crypto?.coin ?? "Bitcoin",
      wallet: data.crypto?.wallet ?? "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
      network: data.crypto?.network ?? "Ethereum (ERC20)",
    },
    role: data.role ?? "user",
    ein: data.ein ?? "",
    ssn: data.ssn ?? "",
    userAgent: data.userAgent ?? "",
  }
}

export function createOptimisticUser(
  payload: Partial<User>,
  tempId: number
): User {
  return normalizeUser({
    ...payload,
    id: tempId,
    image: payload.image ?? "https://robohash.org/default",
  })
}
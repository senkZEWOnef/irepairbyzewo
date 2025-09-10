import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    
    const {
      serviceId,
      date,
      time,
      customerName,
      customerEmail,
      customerPhone,
      notes,
    } = await req.json();

    if (!serviceId || !date || !time || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Create or find user
    let user = await prisma.user.findUnique({
      where: { email: customerEmail }
    });

    if (!user) {
      // Create a temporary user for the booking
      user = await prisma.user.create({
        data: {
          email: customerEmail,
          name: customerName,
          password: "", // Empty password for guest bookings
          role: "CUSTOMER",
        }
      });
    }

    // Find or create the service
    let service = await prisma.service.findFirst({
      where: { name: { contains: serviceId } }
    });

    if (!service) {
      // Create default services if they don't exist
      const serviceData = {
        smartphone: { name: "Smartphone Repair", price: 49, duration: 30 },
        laptop: { name: "Laptop Repair", price: 99, duration: 60 },
        tablet: { name: "Tablet Repair", price: 79, duration: 45 },
        console: { name: "Gaming Console Repair", price: 89, duration: 60 },
        consultation: { name: "General Consultation", price: 0, duration: 30 },
      };

      const defaultService = serviceData[serviceId as keyof typeof serviceData] || serviceData.consultation;
      
      service = await prisma.service.create({
        data: {
          name: defaultService.name,
          description: `Professional ${defaultService.name.toLowerCase()} service`,
          price: defaultService.price,
          duration: defaultService.duration,
        }
      });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        date: new Date(date),
        time,
        customerName,
        customerEmail,
        customerPhone,
        notes: notes || "",
        status: "PENDING",
      },
      include: {
        service: true,
      }
    });

    return NextResponse.json(
      { message: "Booking created successfully", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: (session.user).id
      },
      include: {
        service: true,
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Booking fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
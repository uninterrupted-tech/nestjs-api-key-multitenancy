import { Controller, Get, Post, Body } from '@nestjs/common';
import { TenantKeyAuth } from 'src/auth/tenant-key-auth.decorator';
import { TenantIdParam } from 'src/common/tenant-id.param';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './create-resource.dto';
import { Resource } from './resource.entity';

@TenantKeyAuth()
@Controller('tenants/:tenantId/resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  async create(
    @TenantIdParam() tenantId: string,
    @Body() createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    return this.resourcesService.create(tenantId, createResourceDto);
  }

  @Get()
  async findAll(@TenantIdParam() tenantId: string): Promise<Resource[]> {
    return this.resourcesService.findAllByTenant(tenantId);
  }
}

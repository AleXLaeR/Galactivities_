using AutoMapper;
using Domain;

namespace App.Core_Shared;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
    }
}
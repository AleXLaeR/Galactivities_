using AutoMapper;
using Domain.DTOs;
using Domain.Entities;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(
                d => d.HostUsername, 
                o => o.MapFrom(s =>
                    s.Attendees.FirstOrDefault(a => a.IsHost)!.User.UserName)
            );
    }
}